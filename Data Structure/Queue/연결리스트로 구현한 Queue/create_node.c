/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create_node.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/26 08:10:46 by secho             #+#    #+#             */
/*   Updated: 2020/04/26 08:12:49 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

t_node		*create_node(int data)
{
	t_node *new;
	
	if(!(new = malloc(sizeof(t_node))))
		return (NULL);
	new->data = data;
	new->next = NULL;
	return (new);
}
