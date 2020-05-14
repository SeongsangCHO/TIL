/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create_node.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/11 20:38:43 by secho             #+#    #+#             */
/*   Updated: 2020/04/18 15:01:39 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

t_node	*create_node(int data)
{
	t_node *node;

	if (!(node = malloc(sizeof(t_node))))
		return (0);
	node->next = NULL;
	node->data = data;
	return (node);
}
