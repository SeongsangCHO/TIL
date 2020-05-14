/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   find_list.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 15:20:09 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 16:11:26 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

t_node *find_node(t_node **head, int data)
{
	t_node *find;
	
	find = *head;
	while (find != NULL && find->data != data)
		find = find->next;
	return find;
}
