/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   search_node_n.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 20:43:05 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 21:03:36 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

t_node		*search_node_n(t_list *list, int n)
{
	int 	idx;
	t_node 	*search;

	idx = 0;
	search = list->head;
	while (search != list->tail && idx < n)
	{
		search = search->next;
		idx++;
	}
	return (search);
}
